#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItReleaseMemTimestampExtDef {
    static constexpr std::uint8_t opcode = 0x5a;
    static constexpr std::string_view name = "IT_RELEASE_MEM_TIMESTAMP_EXT";
    static constexpr std::string_view desc = "Release memory with extended 64-bit performance timestamp";
};
}
