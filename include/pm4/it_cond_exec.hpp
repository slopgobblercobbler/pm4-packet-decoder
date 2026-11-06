#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItCondExecDef {
    static constexpr std::uint8_t opcode = 0x47;
    static constexpr std::string_view name = "IT_COND_EXEC";
    static constexpr std::string_view desc = "Conditionally execute sequence of packets depending on memory comparison";
};
}
