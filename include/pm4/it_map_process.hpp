#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItMapProcessDef {
    static constexpr std::uint8_t opcode = 0xa1;
    static constexpr std::string_view name = "IT_MAP_PROCESS";
    static constexpr std::string_view desc = "Map process virtual address space into CP execution context";
};
}
