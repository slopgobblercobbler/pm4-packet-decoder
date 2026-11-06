#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItReleaseMemGdsDef {
    static constexpr std::uint8_t opcode = 0x52;
    static constexpr std::string_view name = "IT_RELEASE_MEM_GDS";
    static constexpr std::string_view desc = "Flush and release Global Data Share memory ring buffer";
};
}
